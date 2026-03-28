import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";

interface Props {
  content: string;
}

export function MarkdownContent({ content }: Props) {
  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      components={{
        code({ className, children, ...props }) {
          const match = /language-(\w+)/.exec(className || "");
          const codeString = String(children).replace(/\n$/, "");
          if (match) {
            return (
              <SyntaxHighlighter
                style={oneDark}
                language={match[1]}
                PreTag="div"
                customStyle={{
                  margin: "0.5rem 0",
                  borderRadius: "0.375rem",
                  fontSize: "0.8rem",
                }}
              >
                {codeString}
              </SyntaxHighlighter>
            );
          }
          return (
            <code
              className="bg-gray-700/50 px-1.5 py-0.5 rounded text-[0.8rem] text-gray-200"
              {...props}
            >
              {children}
            </code>
          );
        },
        p({ children }) {
          return <p className="mb-2 last:mb-0">{children}</p>;
        },
        ul({ children }) {
          return <ul className="list-disc pl-5 mb-2">{children}</ul>;
        },
        ol({ children }) {
          return <ol className="list-decimal pl-5 mb-2">{children}</ol>;
        },
        li({ children }) {
          return <li className="mb-0.5">{children}</li>;
        },
        h1({ children }) {
          return <h1 className="text-lg font-bold mb-2">{children}</h1>;
        },
        h2({ children }) {
          return <h2 className="text-base font-bold mb-1.5">{children}</h2>;
        },
        h3({ children }) {
          return <h3 className="text-sm font-bold mb-1">{children}</h3>;
        },
        blockquote({ children }) {
          return (
            <blockquote className="border-l-2 border-gray-600 pl-3 my-2 text-gray-400 italic">
              {children}
            </blockquote>
          );
        },
        table({ children }) {
          return (
            <div className="overflow-x-auto my-2">
              <table className="border-collapse text-xs">{children}</table>
            </div>
          );
        },
        th({ children }) {
          return (
            <th className="border border-gray-600 px-2 py-1 bg-gray-700/50 text-left font-medium">
              {children}
            </th>
          );
        },
        td({ children }) {
          return (
            <td className="border border-gray-700 px-2 py-1">{children}</td>
          );
        },
        a({ href, children }) {
          return (
            <a href={href} className="text-blue-400 hover:underline" target="_blank" rel="noreferrer">
              {children}
            </a>
          );
        },
      }}
    >
      {content}
    </ReactMarkdown>
  );
}
