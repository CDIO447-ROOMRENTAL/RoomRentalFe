import React, { useState, useEffect } from 'react';
import { Editor } from 'primereact/editor';

function TextEditor({ value, onChange, style, disabled = false }) {
    const [text, setText] = useState(value || ''); // Initialize with provided value or empty string

    // Update the internal state when the value prop changes
    useEffect(() => {
        setText(value || '');
    }, [value]);

    const handleTextChange = (e) => {
        setText(e.htmlValue);
        if (onChange) {
            onChange(e.htmlValue);
        }
    };

    return (
        <div style={{ pointerEvents: disabled ? "none" : "auto", backgroundColor: disabled ? "#FAFAFA" : "white", opacity: disabled ? "0.5" : "1" }}>
            <Editor
                value={text}
                onTextChange={handleTextChange}
                style={style}
            />
        </div>
    );
}

export default TextEditor;
