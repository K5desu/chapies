import Card from "@/components/ui/card";
import { articleCard, articleUser } from "@/lib/type";
export default function Cards(props: {
  owner: boolean;
  isRyu: boolean;
  posts: (articleCard & articleUser)[] | undefined | null;
}) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {props.posts &&
        props.posts.map((post, index) => (
          <Card
            id={post.id}
            title={post.title}
            content={post.content}
            tags={post.tags}
            url={post.url}
            userid={post.userid}
            img={post.img}
            campas={false}
            isRyu={props.isRyu}
            name={post.name || "匿名"}
            image={post.image}
            owner={props.owner}
            key={index}
          />
        ))}
    </div>
  );
}
