Dropping and Uploading Files
============================
React Markmirror can act as a file drop target, which allows files (images) to be inserted into the document by dropped them onto the editor. How the dropped files are handled depends on the value of the `onFiles` prop. You can use one of the two built in drop handlers or create your own.

* [Data URI](#data-uri)
* [Ajax Upload](#ajax-upload)
* [Custom Drop Handlers](#custom-drop-handlers)


## Data URI
The `Markmirror.handlerDataURI()` function embeds images in the document as base64 encoded data URIs.

```jsx
<Markmirror onFiles={Markmirror.handlerDataURI} />
```

Dropped images result in the following markdown being added in the document.

```markdown
![picture.jpg](data:image/jpeg;base64,/9j/4AAQSkZJR ... snip ... 3XHdR7RSP/9k=)
```

_**Note:** Data URIs are often very long, and more often than not you don't want to use this handler. But it can be useful when you do not have a mechanism for uploading files._


## Ajax Upload

The `Markmirror.handlerUpload` function uploads the dropped file to a backend service using an ajax (XHR) request. The backend then returns the type, url, and alt value to embed in the document. A string passed to `Markmirror.handlerUpload` will be treated as the URL where the dropped files are uploaded. The POST method will be used, and the upload given the form field name 'file'.

See the [backend handlers documentation](handlers/uploading.md) for examples of Javascript and PHP scripts to handle the file uploads on the backend.

```jsx
<Markmirror onFiles={Markmirror.handlerUpload('http://yoursite.com/upload')} />
```

That usage is common enough that you can simply pass the URL to the `onFiles` prop as a string.

```jsx
<Markmirror onFiles="http://yoursite.com/upload" />
```

An object of settings may be passed to `Markmirror.handlerUpload` when you need more control over the upload process. Such as setting the request method, headers, additional form values, and listening for events.

```jsx
<Markmirror onFiles={Markmirror.handleUpload({
  url:            'http://site.com/upload',
  method:         'PUT',
  fileFieldName:  'upload',
  formData:       { from: 'react-markmirror' },
  headers:        { Connection: 'keep-alive' },
  onComplete:     (xhr) => { console.log('complete'); },
  onError:        (err)  => { alert(err); }
})} />
```

Or you can simply pass the object to the `onFiles` prop.

```jsx
<Markmirror onFiles={{
  url:            'http://site.com/upload',
  method:         'PUT',
  fileFieldName:  'upload',
  formData:       { from: 'react-markmirror' },
  headers:        { Connection: 'keep-alive' },
  onComplete:     (xhr) => { console.log('complete'); },
  onError:        (err)  => { alert(err); }
}} />
```

The possible settings are as follows:

* url:           Required. Sends the file to this URL.
* method:        The request method, one of 'POST' or 'PUT'. Defaults to "POST".
* headers:       An object of key/value pairs of headers to send.
* formData:      Additional form values to send with the file.
* fileFieldName: The form field name used for the uploaded file. Defaults to "file".
* xhr:           Factory function which returns an instance of `XMLHttpRequest`.
* onSend:        Called before the request is sent. Receives the `XMLHttpRequest` and `File` object.
* onComplete:    Called when the request completes on success or failure. Receives the `XMLHttpRequest` and `File` object.
* onSuccess:     Called when the request succeeds. Receives the server response as an object and `File` object.
* onError:       Called when the request fails. Receives an `Error` object and `File` object.
* onProgress:    Called as the file upload progress changes. Receives the percent complete and `File` object.

_**Note:** This handler uses promises, which some older browsers do not support. Add a [promise polyfill](https://github.com/taylorhakes/promise-polyfill) to your project when you need to support older browsers._


## Custom Drop Handlers
The `onFiles` prop takes a function which is called for each file that got dropped onto the editor. The function receives a `File` object, and must return a promise which eventually resolves to an object containing the properties `type`, `url` and `text`. Possible values for `type` are "image" and "link". The editor uses the values returned by the promise to add markdown to the document which embeds an image or a link. The `text` value is used as the image alt text, or the link text.

An example value resolved by the promise would look something like this:

```json
{
  type: 'image',
  url: 'http://yoursite.com/uploads/image.jpg',
  text: 'A picture'
}
```

The handler function receives a `File` object, and returns a promise which eventually resolves to the file values. This example uses the fictitious `sendToCDN()` function to send the file to a CDN. The function returns the URL where the file was stored.

```js
export default function handlerCDN(file) {
  return new Promise((resolve, reject) => {
    try {
      const url = sendToCDN(file);
      resolve({
        url:  url,
        text: file.name,
        type: 'image'
      });
    } catch (err) {
      reject(new Error(err));
    }
  });
}
```

Now pass the handler to the editor using the `onFiles` prop.

```jsx
<Markmirror onFiles={handlerCDN} />
```
