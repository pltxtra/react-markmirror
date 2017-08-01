/**
 * Drop handler which sets the url to a base64 encoded data uri
 *
 * @param {File} file
 */
export default function handlerDataURI(file) {
  return new Promise((resolve) => {
    const reader  = new FileReader();
    reader.onload = () => {
      resolve({
        type: 'image',
        url:  reader.result,
        text: file.name
      });
    };
    reader.readAsDataURL(file);
  });
}
