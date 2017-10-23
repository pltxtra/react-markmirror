Props
=====

**value={string}**  
The markdown text to render.

```jsx
<Markmirror value="# Header 1" />
```
**defaultValue={string}**  
The inital markdown text to render. Changing this prop set new value to codemirror instance. This is helpful for editing multiple text  

```jsx
<Markmirror defaultValue="# Header 1" />
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

**i18n={object}**  
Translations for the strings displayed by the editor. See the [internationalization docs](docs/i18n.md) for more information.

```jsx
<Markmirror i18n={{
  h1Title:     'Header 1',
  h2Title:     'Header 2',
  h3Title:     'Header 3',
  boldTitle:   'Bold',
  italicTitle: 'Italic',
  ...
}} />
```


**readOnly={boolean}**  
Set to true to make the editor read only.

```jsx
<Markmirror readOnly={true} />
```

**showSearch={boolean}**  
True to add find/replace buttons.

```jsx
<Markmirror showSearch={true} />
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

**styleActiveLine={boolean}**  
True to highlight the active line. The CSS class `CodeMirror-activeline-background` gets added to the active line.

```jsx
<Markmirror styleActiveLine={false} />
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

**onCursor={function}**  
Called when there is cursor activity.

```jsx
<Markmirror onCursor={(cursor) => { console.log(cursor.token.end); }} />
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

**onPreview={function}**  
Handles generating a preview of the markdown code. See the [preview docs](preview.md) for more information.

```jsx
<Markmirror onPreview={value => (Marked(value))} />
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
