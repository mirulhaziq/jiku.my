import Link from 'next/link';
import type { Metadata } from 'next';
import { Badge } from '@/components/Badge';
import { getAllPosts } from '@/lib/posts';

export const metadata: Metadata = {
  title: 'Blog',
  description: 'Notes on shipping products, campus tools, and software I build.',
  alternates: { canonical: 'https://jiku.my/blog' },
};

function formatDate(iso: string) {
  if (!iso) return '';
  return new Date(`${iso}T00:00:00`).toLocaleDateString('en-MY', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}

export default function BlogIndexPage() {
  const posts = getAllPosts();

  return (
    <main className="mx-auto max-w-3xl px-6 py-20 md:py-28">
      <Link
        href="/"
        className="inline-flex items-center gap-1 text-sm text-muted hover:text-fg transition"
      >
        <span aria-hidden="true">←</span> Home
      </Link>

      <header className="mt-8 mb-12 pb-10 border-b border-border">
        <p className="text-xs uppercase tracking-widest text-blue-700 dark:text-blue-400 font-semibold mb-3">
          Blog
        </p>
        <h1 className="text-4xl md:text-5xl font-semibold tracking-tight mb-4">Writing</h1>
        <p className="text-lg text-muted leading-relaxed">
          Short notes on what I ship. Plain language, real constraints.
        </p>
      </header>

      {posts.length === 0 ? (
        <p className="text-muted">No posts yet.</p>
      ) : (
        <ul className="space-y-8">
          {posts.map((post) => (
            <li key={post.slug}>
              <article>
                <p className="text-sm text-muted mb-2">{formatDate(post.date)}</p>
                <h2 className="text-2xl font-semibold tracking-tight mb-3">
                  <Link
                    href={`/blog/${post.slug}`}
                    className="hover:text-blue-700 dark:hover:text-blue-400 transition"
                  >
                    {post.title}
                  </Link>
                </h2>
                <p className="text-muted leading-relaxed mb-4">
                  {post.content.split('\n\n')[0]}
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {post.tags.map((tag) => (
                    <Badge key={tag}>{tag}</Badge>
                  ))}
                </div>
              </article>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
