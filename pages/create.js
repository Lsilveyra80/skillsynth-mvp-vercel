import { useRouter } from "next/router";
import { supabaseClient } from "../lib/supabaseClient";
// ...

export default function CreatePage() {
  const router = useRouter();
  const { projectId } = router.query;
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    supabaseClient.auth.getSession().then(({ data }) => {
      if (!data.session) {
        router.replace("/login");
      } else {
        setUserId(data.session.user.id);
      }
    });
  }, [router]);

  // en handleSubmit:
  const response = await fetch("/api/compose", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      habilidades,
      objetivo,
      industria,
      tiempo,
      userId,
      projectId,
    }),
  });
