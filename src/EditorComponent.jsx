import React, { useRef, useEffect, useState } from 'react';
import EditorJS from '@editorjs/editorjs';
import Header from '@editorjs/header';
import Table from '@editorjs/table';
import Embed from '@editorjs/embed';
import SimpleImage from '@editorjs/simple-image';
import LinkTool from '@editorjs/link';
import List from '@editorjs/list';


const DEFAULT_INITIAL_DATA = {
  "time": new Date().getTime(),
  "blocks": [
    {
      "type": "header",
      "data": {
        "text": "This is my awesome editor!",
        "level": 1
      }
    },
  ]
}

const EditorComponent = () => {

  const ejInstance = useRef();

  const initEditor = () => {
    const editor = new EditorJS({
      holder: 'editorjs',
      onReady: () => {
        ejInstance.current = editor;
      },
      autofocus: true,
      data: DEFAULT_INITIAL_DATA,
      onChange: async () => {
        let content = await editor.saver.save();
        console.log(content);
      },
      tools: {
        header: Header,
        table: Table,
        embed: {
          class: Embed,
          inlineToolbar: true,
        },
        image: SimpleImage,
        link: LinkTool,
        list: List
      }
    })
  }

  useEffect(() => {
    if (ejInstance.current === null) {
      initEditor();
    }

    return () => {
      ejInstance?.current?.destroy();
      ejInstance.current = null;
    }
  }, [])

  return (
    <>
      <div id="editorjs">

      </div>
    </>
  )
};

export default EditorComponent;
