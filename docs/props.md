Props
=====

**value={string}**  
The markdown text to render.

```jsx
<Markmirror value="# Header 1" />
```

**name={string}**  
Name given to the textarea.

```jsx
<Markmirror name="content" />
```

**theme={string}**  
The styling theme. See the [theme docs](docs/themes.md) for more information.

```jsx
<Markmirror theme="light" />
```

**readOnly={boolean}**  
Set to true to make the editor read only.

```jsx
<Markmirror readOnly={true} />
```

**tabSize={number}**  
Number of spaces that make up a tab.

```jsx
<Markmirror tabSize={2} />
```

**indentWithTabs={boolean}**  
True to use tabs, false to use spaces.

```jsx
<Markmirror indentWithTabs={false} />
```

**lineNumbers={boolean}**  
True to display line numbers.

```jsx
<Markmirror lineNumbers={true} />
```

**lineWrapping={boolean}**  
True to wrap long lines.

```jsx
<Markmirror lineWrapping={false} />
```

**acceptedFileTypes={array}**  
List of mime types for files which may be dropped/uploaded.

```jsx
<Markmirror acceptedFileTypes={['image/jpg', 'image/gif', 'image/png', 'video/mpg']} />
```

The specific type may be excluded.

```jsx
<Markmirror acceptedFileTypes={['image', 'video', 'application/pdf']} />
```


**codemirrorOptions={object}**  
Options passed to the internal CodeMirror instance. See the [CodeMirror API docs](https://codemirror.net/doc/manual.html#api) for the available options.

```jsx
<Markmirror codemirrorOptions={{
  lineSeparator:  "\r\n",
  scrollbarStyle: null
}} />
```

**codemirrorEvents={object}**  
Event handlers passed to the internal CodeMirror instance. See the [CodeMirror API docs](https://codemirror.net/doc/manual.html#events) for available events.

```jsx
<Markmirror codemirrorEvents={{
  change: function(codemirror) {
    console.log(codemirror.getValue());
  },
  focus: function() {
    console.log('Focused!');
  }
}} />
```

**onChange={function}**  
Called when a change is made.

```jsx
<Markmirror onChange={(value) => { console.log(value); }} />
```

**onFiles={function}**  
Handles files which are dropped onto the editor. See the [uploading docs](uploading.md) for more information.

```jsx
<Markmirror onFiles={Markmirror.handlerUpload('http://yoursite.com/upload')} />
```

**onPrompt={function}**  
Handles prompting the client to input a link or image URL. See the [prompt docs](prompt.md) for more information.

```jsx
<Markmirror onPrompt={Markmirror.handlerPrompt} />
```

**renderButton={function}**  
Renders each toolbar button. See the [button customizing docs](button.md) for more information.

```jsx
<Markmirror renderButton={this.renderButton} />
```

**renderToolbar={function}**  
Renders the toolbar. See the [toolbar customizing docs](toolbar.md) for more information.

```jsx
<Markmirror renderToolbar={this.renderToolbar} />
```
