import { createHash } from "node:crypto";

export const runtime = "nodejs";

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type NewsletterPayload = {
  email?: unknown;
};

export async function POST(request: Request) {
  let payload: NewsletterPayload;

  try {
    payload = await request.json();
  } catch {
    return Response.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const email =
    typeof payload.email === "string" ? payload.email.trim().toLowerCase() : "";

  if (!emailPattern.test(email)) {
    return Response.json({ error: "Invalid email" }, { status: 400 });
  }

  const apiKey = process.env.MAILCHIMP_API_KEY;
  const audienceId = process.env.MAILCHIMP_AUDIENCE_ID;
  const serverPrefix =
    process.env.MAILCHIMP_SERVER_PREFIX ?? apiKey?.split("-").at(-1);

  if (!apiKey || !audienceId || !serverPrefix) {
    return Response.json(
      { error: "Mailchimp is not configured" },
      { status: 500 },
    );
  }

  const subscriberHash = createHash("md5").update(email).digest("hex");
  const response = await fetch(
    `https://${serverPrefix}.api.mailchimp.com/3.0/lists/${audienceId}/members/${subscriberHash}`,
    {
      method: "PUT",
      headers: {
        Authorization: `Basic ${Buffer.from(`anystring:${apiKey}`).toString(
          "base64",
        )}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email_address: email,
        status_if_new: "subscribed",
      }),
    },
  );

  if (!response.ok) {
    const problem = await response.json().catch(() => null);

    return Response.json(
      {
        error: "Mailchimp request failed",
        detail:
          problem && typeof problem === "object" && "detail" in problem
            ? problem.detail
            : undefined,
      },
      { status: response.status },
    );
  }

  return Response.json({ ok: true });
}
