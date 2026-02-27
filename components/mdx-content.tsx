import { MDXRemote } from "next-mdx-remote/rsc";
import { Tweet } from "react-tweet";
import remarkGfm from "remark-gfm";
import type { ComponentPropsWithoutRef } from "react";

const components = {
  h2: (props: ComponentPropsWithoutRef<"h2">) => (
    <h2 className="mt-10 mb-4 text-xl font-semibold text-balance" {...props} />
  ),
  h3: (props: ComponentPropsWithoutRef<"h3">) => (
    <h3 className="mt-8 mb-3 text-lg font-medium text-balance" {...props} />
  ),
  h4: (props: ComponentPropsWithoutRef<"h4">) => (
    <h4 className="mt-6 mb-2 text-base font-medium text-balance" {...props} />
  ),
  p: (props: ComponentPropsWithoutRef<"p">) => (
    <p className="mb-4 text-base leading-relaxed text-foreground/80 text-pretty" {...props} />
  ),
  ul: (props: ComponentPropsWithoutRef<"ul">) => (
    <ul className="mb-4 ml-4 list-disc space-y-2.5 text-foreground/80" {...props} />
  ),
  ol: (props: ComponentPropsWithoutRef<"ol">) => (
    <ol className="mb-4 ml-4 list-decimal space-y-2.5 text-foreground/80" {...props} />
  ),
  li: (props: ComponentPropsWithoutRef<"li">) => (
    <li className="text-base leading-relaxed [&>ul]:mt-2 [&>ul]:mb-0 [&>ol]:mt-2 [&>ol]:mb-0" {...props} />
  ),
  strong: (props: ComponentPropsWithoutRef<"strong">) => (
    <strong className="font-medium text-foreground" {...props} />
  ),
  a: ({ href, ...props }: ComponentPropsWithoutRef<"a">) => {
    const isExternal = href?.startsWith("http");
    return (
      <a
        href={href}
        className="underline decoration-muted-foreground/30 underline-offset-4 transition-colors hover:decoration-foreground/50"
        {...(isExternal && { target: "_blank", rel: "noopener noreferrer" })}
        {...props}
      />
    );
  },
  blockquote: (props: ComponentPropsWithoutRef<"blockquote">) => (
    <blockquote
      className="mt-4 mb-4 border-l-2 border-border pl-4 text-foreground/60"
      {...props}
    />
  ),
  code: (props: ComponentPropsWithoutRef<"code">) => (
    <code
      className="rounded bg-muted px-1.5 py-0.5 font-mono text-sm text-foreground/80"
      {...props}
    />
  ),
  pre: (props: ComponentPropsWithoutRef<"pre">) => (
    <pre
      className="mb-4 overflow-x-auto rounded-lg border border-border bg-muted p-4 font-mono text-sm"
      {...props}
    />
  ),
  table: (props: ComponentPropsWithoutRef<"table">) => (
    <div className="mb-4 overflow-x-auto">
      <table className="w-full text-sm" {...props} />
    </div>
  ),
  thead: (props: ComponentPropsWithoutRef<"thead">) => (
    <thead className="border-b border-border" {...props} />
  ),
  th: (props: ComponentPropsWithoutRef<"th">) => (
    <th scope="col" className="px-3 py-2 text-left font-medium text-foreground" {...props} />
  ),
  td: (props: ComponentPropsWithoutRef<"td">) => (
    <td className="px-3 py-2 text-foreground/80 border-b border-border/50" {...props} />
  ),
  hr: () => <hr className="my-8 border-border" />,
  Tweet: ({ id }: { id: string }) => (
    <div className="my-6 flex justify-center [&>div]:!max-w-full">
      <Tweet id={id} />
    </div>
  ),
};

const options = {
  mdxOptions: {
    remarkPlugins: [remarkGfm],
  },
};

export function MdxContent({ source }: { source: string }) {
  return <MDXRemote source={source} components={components} options={options} />;
}
