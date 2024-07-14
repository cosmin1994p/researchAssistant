import Link from "next/link";

export default function Home() {
  return (
    <div className="container">
      <div className="card hero">
        <p className="text-display-1 hero-title">
          Research Assistant 
        </p>
        <Link
          href="https://causefinder.ase.ro/"
          target="_blank"
          rel="noreferrer"
          className="btn btn-light btn-big"
        >
          Powered by Cause Finder
        </Link>
      </div>
    </div>  
  );
}
