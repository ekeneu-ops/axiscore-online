// Committed console config — ENDPOINT ONLY, never the token.
// The CRM console reads this to know where the authed read path lives
// (CloudFront -> OAC -> IAM-authed Lambda URL -> crm.* views).
// The access token (mc-spine/crm-console-token) is pasted once in ⚙ Settings
// and lives only in the browser's localStorage.
window.CRM_ENDPOINT = "https://d3mnzqm7ogfxgm.cloudfront.net/";
