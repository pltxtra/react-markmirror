Backend Handler Examples
========================
This document provides some simple examples in a few languages which handle file uploads sent from the editor.

* [PHP](#php)
* [Javascript](#javascript)


## PHP

_app.jsx_

```jsx
import React from 'react';
import ReactDOM from 'react-dom';
import Markmirror from 'react-markmirror';

const App = () => (
  <Markmirror onFiles="upload.php" />
);

ReactDOM.render(<App />, document.getElementById('mount'));
```

_upload.php_

```php
$target_dir  = "uploads/";
$target_file = $target_dir . basename($_FILES["file"]["name"]);

header("Content-Type: application/json");
if (move_uploaded_file($_FILES["file"]["tmp_name"], $target_file)) {
  header("Status: 200 Ok");
  echo json_encode([
    "type" => "image",
    "url"  => "http://dev.headzoo.io/" . $target_file,
    "text" => $_FILES["file"]["name"]
  ]);
} else {
  header("Status: 500 Server Error");
  echo json_encode([
    "error" => "Error uploading the file"
  ]);
}
```


## Javascript
