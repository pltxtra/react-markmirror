import { objectAssign, objectForEach } from '../utils/objects';

const VALID_METHODS = ['POST', 'PUT'];

/**
 * Drop handler which uses ajax to upload files to a backend server
 *
 * Possible settings:
 *
 * - url:           Required. Sends the file to this URL.
 * - method:        The request method, one of 'POST' or 'PUT'.
 * - headers:       An object of key/value pairs of headers to send.
 * - formData:      Additional form values to send with the file.
 * - fileFieldName: The form field name used for the uploaded file.
 * - xhr:           Factory function which returns an instance of XMLHttpRequest.
 * - onSend:        Called before the request is sent. Receives the XMLHttpRequest instance.
 * - onComplete:    Called when the request completes on success or failure. Receives the XMLHttpRequest instance.
 * - onSuccess:     Called when the request succeeds. Receives the server response object.
 * - onError:       Called when the request fails. Receives the error object.
 * - onProgress:    Called as the file upload progress changes. Receives the percent complete.
 *
 * Usage:
 *
 * A string argument is treated as a URL. The POST method will be used, and the name 'file' will be
 * used as the file form field.
 *
 * ```jsx
 *  <Markmirror onDrop={handlerUpload('http://site.com/upload')} />
 * ```
 *
 * Or an object may be used with complete settings.
 *
 * ```jsx
 *  <Markmirror onDrop={handleUpload({
 *    url:            'http://site.com/upload',
 *    method:         'PUT',
 *    fileFieldName:  'upload',
 *    formData:       { from: 'react-markmirror' },
 *    headers:        { Connection: 'keep-alive' },
 *    onSend:         (xhr) => { console.log('sending'); },
 *    onComplete:     (xhr) => { console.log('complete'); },
 *    onSuccess:      (resp) => { console.log(resp); },
 *    onError:        (err)  => { console.log(err); },
 *    onProgress:     (percent) => { console.log(percent); }
 *  })} />
 * ```
 *
 * @param {Object|string} settings
 * @returns {Function}
 */
export default function handlerUpload(settings) {
  if (typeof settings === 'string') {
    settings = { url: settings };
  }
  const options = objectAssign({
    url:           '',
    method:        'POST',
    headers:       {},
    formData:      {},
    fileFieldName: 'file',
    xhr:           () => new XMLHttpRequest(),
    onSend:        () => {},
    onComplete:    () => {},
    onSuccess:     () => {},
    onError:       () => {},
    onProgress:    () => {}
  }, settings);

  if (!options.url) {
    throw new Error('Invalid settings.url.');
  }
  if (!options.fileFieldName) {
    throw new Error('Invalid settings.fileFieldName.');
  }
  if (VALID_METHODS.indexOf(options.method.toUpperCase()) === -1) {
    throw new Error(`Invalid settings.method "${options.method}".`);
  }
  if (typeof options.headers !== 'object') {
    throw new Error('Invalid settings.headers.');
  }
  if (typeof options.formData !== 'object') {
    throw new Error('Invalid settings.formData.');
  }

  return file => (
    new Promise((resolve, reject) => {
      const xhr = options.xhr();
      xhr.open(options.method, options.url, true);
      xhr.upload.addEventListener('progress', (e) => {
        const percent = Math.floor((e.loaded * 100) / e.total);
        options.onProgress(percent, file);
      }, false);

      xhr.onreadystatechange = () => {
        if (xhr.readyState === 4) {
          let status = xhr.status;
          let resp   = null;

          if (status === 0) {
            status = 500;
            resp   = { error: 'Could not load remote resource.' };
          } else {
            try {
              resp = JSON.parse(xhr.responseText);
            } catch (e) {
              status = 500;
              resp   = { error: 'Invalid server response.' };
            }
          }

          options.onComplete(xhr, file);
          if (status === 200) {
            options.onSuccess(resp, file);
            resolve(resp);
          } else {
            const err = new Error(resp.error);
            options.onError(err, file);
            reject(err);
          }
        }
      };

      const formData = new FormData();
      objectForEach(options.formData, (value, key) => {
        formData.append(key, value);
      });
      formData.append(options.fileFieldName, file, file.name);

      options.headers.Accept = 'application/json';
      objectForEach(options.headers, (value, key) => {
        xhr.setRequestHeader(key, value);
      });

      options.onSend(xhr, file);
      options.onProgress(0);
      xhr.send(formData);
    })
  );
}
