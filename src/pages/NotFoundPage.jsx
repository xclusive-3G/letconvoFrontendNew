import Footer from "../components/Footer";

export default function NotFoundPage({ setPage }) {
  return (
    <main className="relative z-10 pt-32 bg-white">
      <section className="max-w-3xl mx-auto px-6 py-20">
        <p className="text-[#8B6E3C]">404</p>
        <h1 className="font-syne text-4xl font-bold mt-3">Page not found</h1>
        <p className="my-6">This address may have changed. Explore our AI receptionist or check pricing to find what you need.</p>
        <a href="/" onClick={event => { event.preventDefault(); setPage("benefits"); }} className="text-[#8B6E3C] underline mr-6">Explore Letconvo</a>
        <a href="/pricing" onClick={event => { event.preventDefault(); setPage("pricing"); }} className="text-[#8B6E3C] underline">View pricing</a>
      </section>
      <Footer setPage={setPage} />
    </main>
  );
}
