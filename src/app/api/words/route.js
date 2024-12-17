export async function GET(req, res) {
  const words = ['application', 'programming', 'interface', 'wizard'];
  return new Response(JSON.stringify(words), { status: 200 });
}