import { addNewFacility } from "@/app/api/linelib/addNewFacility";
import Tastex from "@/components/ui/toastexe";
import Toastex from "@/components/ui/toastexe";
export default function Page() {
  async function sendText(formData: FormData) {
    "use server";

    const text = (formData.get("text") as string) || "";
    const res = await addNewFacility(text);

    if (res === "OK") {
    } else {
    }
  }
  return (
    <>
      <form action={sendText}>
        <Tastex />
      </form>
    </>
  );
}
