'use client';

import React, { useRef, useEffect } from 'react';
import EditorJS from '@editorjs/editorjs';
import Header from '@editorjs/header';
import List from '@editorjs/list';
import Quote from '@editorjs/quote';

type SimpleEditorProps = {
  onChange?: (data: any) => void;
  initialData?: any;
};

export default function SimpleEditor({ onChange, initialData }: SimpleEditorProps) {
  const ejInstance = useRef<EditorJS | null>(null);
  const editorHolderId = 'editorjs';

  useEffect(() => {
    if (!ejInstance.current) {
      ejInstance.current = new EditorJS({
        holder: editorHolderId,
        autofocus: true,
        data: initialData,
        tools: {
          header: Header,
          list: List,
          quote: Quote,
        },
        onChange: async () => {
          const content = await ejInstance.current?.save();
          onChange && onChange(content);
        },
      });
    }

    return () => {
      ejInstance.current?.destroy();
      ejInstance.current = null;
    };
  }, []);  // فقط یک بار اجرا میشه (برای mount)

  return (
    <div>
      <div id={editorHolderId} className="border rounded p-4 min-h-[100px]" />
    </div>
  );
}
