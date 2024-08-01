import { Input } from "@/components/ui/input";
export default function Page() {
  return (
    <div>
      <form>
        <h1>AI</h1>
        <Input name="question"></Input>
        <button type="submit" className="b-black-500">
          聞く
        </button>
        <p>AIページです。</p>
      </form>
    </div>
  );
}
