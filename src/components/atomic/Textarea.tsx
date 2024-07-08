import React, { useRef, useEffect, ChangeEvent } from 'react';

interface TextareaProps {
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
  className?: string;
  maxHeight?: number;
  autoFocus?: boolean;
}

const Textarea: React.FC<TextareaProps> = ({
  placeholder,
  value,
  onChange,
  className = '',
  maxHeight = 200,
  autoFocus = false,
}) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const adjustTextareaHeight = () => {
    const textarea = textareaRef.current;
    if (textarea) {
      // Reset height to auto to get the correct scrollHeight
      textarea.style.height = 'auto';
      // Set the height to the scrollHeight, but not exceeding maxHeight
      textarea.style.height = `${Math.min(textarea.scrollHeight, maxHeight)}px`;
    }
  };

  useEffect(() => {
    adjustTextareaHeight();
  }, [value]);

  useEffect(() => {
    if (autoFocus && textareaRef.current) {
      textareaRef.current.focus();
    }
  }, [autoFocus]);

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    onChange(e.target.value);
    adjustTextareaHeight();
  };

  return (
    <textarea
      ref={textareaRef}
      value={value}
      onChange={handleChange}
      placeholder={placeholder}
      className={`resize-none overflow-hidden ${className}`}
      style={{
        maxHeight: `${maxHeight}px`,
        minHeight: '1.5em',
      }}
      rows={1}
      autoFocus={autoFocus}
    />
  );
};

export default Textarea;