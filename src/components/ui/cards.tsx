import Card from "@/components/ui/card";
import { articleCard } from "@/lib/type";
export default function Cards() {
  const posts: articleCard[] = [
    {
      title: "Reactの基本",
      content: "Reactの基本的な使い方について解説します。",
      tags: "React",
      img: "https://source.unsplash.com/random",
      url: "/",
      userid: "/1",
    },
    {
      title: "Tailwind CSSの魅力",
      content: "なぜTailwind CSSが便利なのか、その理由を説明します。",
      tags: "React",
      img: "https://source.unsplash.com/random",
      url: "/",
      userid: "/1",
    },
    {
      title: "Next.jsの使い方",
      content: "Next.jsの基本的な使い方について解説します。",
      tags: "React",
      img: "https://source.unsplash.com/random",
      url: "/",
      userid: "/1",
    },
    {
      title: "Reactの基本",
      content: "Reactの基本的な使い方について解説します。",
      tags: "React",
      img: "https://source.unsplash.com/random",
      url: "/",
      userid: "/1",
    },
    {
      title: "Tailwind CSSの魅力",
      content: "なぜTailwind CSSが便利なのか、その理由を説明します。",
      tags: "React",
      img: "https://source.unsplash.com/random",
      url: "/",
      userid: "/1",
    },
    {
      title: "Next.jsの使い方",
      content: "Next.jsの基本的な使い方について解説します。",
      tags: "React",
      img: "https://source.unsplash.com/random",
      url: "/",
      userid: "/1",
    },
  ];
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {posts.map((post, index) => (
        <Card
          title={post.title}
          content={post.content}
          tags="React"
          img="https://s3-ap-northeast-1.amazonaws.com/xlab-leica-microsystems/wordpress/wp-content/uploads/title.jpg"
          url="/"
          userid="/1"
          key={index}
        />
      ))}
    </div>
  );
}
