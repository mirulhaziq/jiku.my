import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { Badge } from '@/components/Badge';
import { getAllPosts, getPost } from '@/lib/posts';

export function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const post = getPost(params.slug);
  if (!post) return { title: 'Not found' };

  const url = `https://jiku.my/blog/${post.slug}`;
  const description = post.content.split('\n\n')[0] ?? post.title;

  return {
    title: post.title,
    description,
    alternates: { canonical: url },
    openGraph: {
      type: 'article',
      url,
      title: `${post.title} — Amirul Haziq`,
      description,
      publishedTime: post.date,
      images: ['/og.png'],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description,
      images: ['/og.png'],
    },
  };
}

function formatDate(iso: string) {
  if (!iso) return '';
  return new Date(`${iso}T00:00:00`).toLocaleDateString('en-MY', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = getPost(params.slug);
  if (!post) notFound();

  const paragraphs = post.content.split(/\n\n+/).filter(Boolean);

  return (
    <main className="mx-auto max-w-3xl px-6 py-20 md:py-28">
      <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm">
        <Link
          href="/#blog"
          className="inline-flex items-center gap-1 text-muted hover:text-fg transition"
        >
          <span aria-hidden="true">←</span> Back to portfolio
        </Link>
        <Link
          href="/blog"
          className="inline-flex items-center gap-1 text-muted hover:text-fg transition"
        >
          All posts
        </Link>
      </div>

      <header className="mt-8 mb-12 pb-10 border-b border-border">
        <p className="text-xs uppercase tracking-widest text-blue-700 dark:text-blue-400 font-semibold mb-3">
          Blog
        </p>
        <h1 className="text-4xl md:text-5xl font-semibold tracking-tight mb-4">{post.title}</h1>
        <p className="text-sm text-muted mb-6">{formatDate(post.date)}</p>
        <div className="flex flex-wrap gap-1.5">
          {post.tags.map((tag) => (
            <Badge key={tag}>{tag}</Badge>
          ))}
        </div>
      </header>

      <article className="space-y-6 text-lg leading-relaxed text-fg">
        {paragraphs.map((paragraph) => (
          <p key={paragraph.slice(0, 48)} className="text-muted leading-relaxed">
            {paragraph}
          </p>
        ))}
      </article>
    </main>
  );
}
