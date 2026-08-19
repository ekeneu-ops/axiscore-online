// Committed console config — ENDPOINT ONLY, never the token.
// The decision-queue console reads this to know where the authed read path lives
// (CloudFront -> OAC -> IAM-authed Lambda URL -> capture.decision_queue).
// The access token (mc-spine/capture-console-token) is pasted once in ⚙ Settings
// and lives only in the browser's localStorage.
window.CAPTURE_ENDPOINT = "https://d1bx9yj21svzb.cloudfront.net/";
