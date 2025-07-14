import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";
const CreateNote = () => {

  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);

  const handleTextChangeForContent = (e) => {
    setContent(e.target.value);
  };

  const handleTextChangeForTitle = (e) => {
    setTitle(e.target.value);
  };

  const formatText = (command) => {
    const textarea = document.getElementById('editor-textarea');
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = textarea.value.substring(start, end);
    
    if (selectedText.length === 0) {
      // If no text selected, just insert formatting at cursor
      let insertText = '';
      switch (command) {
        case 'bold':
          insertText = '**bold text**';
          break;
        case 'italic':
          insertText = '*italic text*';
          break;
        case 'underline':
          insertText = '__underlined text__';
          break;
        case 'heading':
          insertText = '# Heading';
          break;
        case 'list':
          insertText = '- List item';
          break;
        default:
          return;
      }
      
      const newValue = content.substring(0, start) + insertText + content.substring(end);
      setContent(newValue);
      
      // Set cursor position after the inserted text
      setTimeout(() => {
        textarea.focus();
        textarea.setSelectionRange(start + insertText.length, start + insertText.length);
      }, 0);
      return;
    }
    
    let formattedText = selectedText;
    
    switch (command) {
      case 'bold':
        formattedText = `**${selectedText}**`;
        break;
      case 'italic':
        formattedText = `*${selectedText}*`;
        break;
      case 'underline':
        formattedText = `__${selectedText}__`;
        break;
      case 'heading':
        formattedText = `# ${selectedText}`;
        break;
      case 'list':
        formattedText = selectedText.split('\n').map(line => `- ${line}`).join('\n');
        break;
      default:
        return;
    }
    
    const newValue = content.substring(0, start) + formattedText + content.substring(end);
    setContent(newValue);
    
    // Restore focus and selection
    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(start, start + formattedText.length);
    }, 0);
  };

  const handleSubmit = async () => {
    if (content.trim().length === 0) {
      alert("Please enter some content before submitting");
      return;
    }
    
    setLoading(true);
    
    try {
      // const noteData = content;
      await api.post("/notes", {title, content});

      
      alert("Note created successfully!");
      setContent(""); // Clear editor after successful submission
      setTitle("");
      navigate("/notes");
    } catch (error) {
      alert("Error creating note. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleClear = () => {
    setContent("");
    document.getElementById('editor-textarea').focus();
  };

  const renderPreview = () => {
    return content
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.*?)\*/g, '<em>$1</em>')
      .replace(/__(.*?)__/g, '<u>$1</u>')
      .replace(/^# (.*$)/gm, '<h1 class="text-xl font-bold mb-2">$1</h1>')
      .replace(/^- (.*$)/gm, '<li class="ml-4">$1</li>')
      .replace(/\n/g, '<br>');
  };

  return (
    <div className="min-h-[calc(100vh-74px)] p-10">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center">
          <span className="text-white font-bold">📝</span>
        </div>
        <h1 className="text-2xl font-bold text-gray-800">Create New Note</h1>
      </div>

      {/* Toolbar */}
      <div className="bg-gray-50 border border-gray-200 rounded-t-lg p-3 flex flex-wrap gap-2">
        <button
          onClick={() => formatText('bold')}
          className="px-3 py-2 bg-white hover:bg-gray-100 border rounded transition-colors font-bold"
          title="Bold"
        >
          <strong>B</strong>
        </button>
        
        <button
          onClick={() => formatText('italic')}
          className="px-3 py-2 bg-white hover:bg-gray-100 border rounded transition-colors italic"
          title="Italic"
        >
          <em>I</em>
        </button>
        
        <button
          onClick={() => formatText('underline')}
          className="px-3 py-2 bg-white hover:bg-gray-100 border rounded transition-colors underline"
          title="Underline"
        >
          <u>U</u>
        </button>
        
        <button
          onClick={() => formatText('heading')}
          className="px-3 py-2 bg-white hover:bg-gray-100 border rounded transition-colors font-bold"
          title="Heading"
        >
          H1
        </button>
        
        <button
          onClick={() => formatText('list')}
          className="px-3 py-2 bg-white hover:bg-gray-100 border rounded transition-colors"
          title="List"
        >
          • List
        </button>
        
        <div className="flex-1"></div>
        
        <button
          onClick={handleClear}
          className="px-3 py-2 bg-white hover:bg-gray-100 border rounded transition-colors text-red-600"
          title="Clear"
        >
          Clear
        </button>
      </div>

       {/* Editor */}
      <div className="border-x border-gray-200 bg-white">
        <textarea
          id="editor-textarea"
          value={title}
          onChange={handleTextChangeForTitle}
          className="w-full h-4 p-4 border-0 outline-none resize-none font-mono text-sm leading-relaxed"
          placeholder="Enter Note title"
        />
      </div>


      {/* Editor */}
      <div className="border-x border-gray-200 bg-white">
        <textarea
          id="editor-textarea"
          value={content}
          onChange={handleTextChangeForContent}
          className="w-full h-64 p-4 border-0 outline-none resize-none font-mono text-sm leading-relaxed"
          placeholder="Start typing here... Use the toolbar buttons to format your text."
        />
      </div>

      {/* Footer */}
      <div className="bg-gray-50 border border-gray-200 rounded-b-lg p-3 flex justify-between items-center">
        <div className="text-sm text-gray-600">
          Characters: {content.length} | Words: {content.trim().split(/\s+/).filter(word => word.length > 0).length}
        </div>
        
        <button
          onClick={handleSubmit}
          disabled={loading || content.trim().length === 0}
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium flex items-center gap-2"
        >
          {loading ? (
            <>
              <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
              Submitting...
            </>
          ) : (
            "Submit"
          )}
        </button>
      </div>

      {/* Preview */}
      {content && (
        <div className="mt-6 bg-gray-50 border border-gray-200 rounded-lg p-4">
          <h3 className="text-lg font-semibold text-gray-800 mb-3">Preview:</h3>
          <div 
            className="prose prose-sm max-w-none bg-white p-4 rounded border"
            dangerouslySetInnerHTML={{ __html: renderPreview() }}
          />
        </div>
      )}
    </div>
  );
};

export default CreateNote;