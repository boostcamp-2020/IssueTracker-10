import React from 'react';
import styled from 'styled-components';
import ReactMarkdown from 'react-markdown';
import gfm from 'remark-gfm';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { docco } from 'react-syntax-highlighter/dist/esm/styles/hljs';

const InlineCode = styled.span`
  padding: 2px 4px;
  background-color: ${(props) => props.theme.lightGrayColor};
  border-radius: 6px;
`;

const InlineCodeBlock = (props) => {
  const { value } = props;
  return <InlineCode>{value}</InlineCode>;
};

const MarkdownViewer = ({ source }) => {
  const renderers = {
    code: ({ language, value }) => (
      <SyntaxHighlighter style={docco} language={language} children={value} />
    ),
    image: ({ alt, src, title }) => (
      <img alt={alt} src={src} title={title} style={{ maxWidth: 300 }} />
    ),
    inlineCode: InlineCodeBlock,
  };

  return (
    <>
      <ReactMarkdown
        source={source}
        plugins={[gfm, { singleTilde: false }]}
        renderers={renderers}
        escapeHtml={false}
      />
    </>
  );
};

export default MarkdownViewer;
