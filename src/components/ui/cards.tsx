import Card from "@/components/ui/card";
import { articleCard } from "@/lib/type";
import getAllarticle from "@/app/api/article/getAllarticle";
export default function Cards(props: {
  isRyu: boolean;
  posts: articleCard[] | undefined | null;
}) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {props.posts &&
        props.posts.map((post, index) => (
          <Card
            title={post.title}
            content={post.content}
            tags="React"
            img="https://s3-ap-northeast-1.amazonaws.com/xlab-leica-microsystems/wordpress/wp-content/uploads/title.jpg"
            url="/"
            userid="/1"
            userimg="/annonymous.jpg"
            campas={false}
            isRyu={props.isRyu}
            key={index}
          />
        ))}
    </div>
  );
}
