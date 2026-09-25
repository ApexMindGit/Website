import type { Metadata } from "next";
import Link from "next/link";
import { PageHero, CTABand, Arrow } from "../../components/ui";

export const metadata: Metadata = {
  title: "Solutions",
  description:
    "Start with the problem you want to solve. Explore Apex Mind's capabilities in building software, applying AI, automating work, connecting systems, and getting found online.",
};

// Problem cards, grouped by the capability they lead to. Written in the
// client's words, not service names. Provisional copy — no claims or metrics.
type ProblemGroup = {
  label: string;
  href: string;
  cards: readonly (readonly [title: string, body: string])[];
};

const groups: ProblemGroup[] = [
  {
    label: "Software development",
    href: "/what-we-do/build",
    cards: [
      ["An idea needs building", "You have a product in mind and need help deciding what the first version should do."],
      ["Spreadsheets have outgrown the job", "Critical work lives in shared sheets that break, conflict, or depend on one person understanding them."],
      ["Your team needs an internal tool", "Staff work around gaps in off-the-shelf software and need something shaped to how they actually operate."],
      ["You need a customer or partner portal", "Clients, vendors, or field teams need a secure place to log in, submit, track, and download."],
      ["Existing software needs attention", "An application needs fixes, new features, or a clearer path toward modernization and maintenance."],
      ["A legacy system is holding you back", "An older application is hard to change, slow to run, or depends on technology few people still support."],
      ["The original developer is gone", "You own software nobody fully understands anymore and need someone to take it over carefully."],
      ["The app is slow or unreliable", "Pages lag, jobs fail, or errors appear under load, and you need the causes found and fixed."],
    ],
  },
  {
    label: "Applied AI",
    href: "/what-we-do/intelligence",
    cards: [
      ["AI needs a purpose", "You want to use AI but need to connect it to a specific, practical task first."],
      ["Documents take too long to read", "People spend hours extracting details from PDFs, contracts, specifications, or forms."],
      ["Comparing documents is manual", "Teams check bids, specs, or versions side by side and want the comparison prepared for review."],
      ["Knowledge is scattered", "Answers exist across files, wikis, and inboxes, but finding the right one takes too long."],
      ["You want AI inside your product", "Your users would benefit from search, summaries, or assistance built into the software they already use."],
      ["Requests need sorting and routing", "Incoming emails, tickets, or forms have to be read and classified before anyone can act on them."],
    ],
  },
  {
    label: "Automate",
    href: "/what-we-do/automate",
    cards: [
      ["Work keeps repeating", "Your team repeats the same manual steps every day and wants to explore a different way of working."],
      ["Data is typed in twice", "The same information is entered into more than one system, with errors creeping in along the way."],
      ["Your systems don't talk to each other", "CRM, accounting, inventory, and other tools hold separate versions of the same information."],
      ["Reports take days to assemble", "Someone pulls numbers from several places every week or month to build the same report."],
      ["Approvals get stuck in inboxes", "Requests wait on email chains, and nobody can see where something is or who it is waiting on."],
      ["Onboarding is a checklist of manual steps", "New customers, staff, or vendors trigger the same account setup and paperwork every time."],
    ],
  },
  {
    label: "RPA",
    href: "/what-we-do/rpa",
    cards: [
      ["A portal has no API", "Work depends on a government, bank, or supplier website that can only be used by clicking through it."],
      ["Desktop software can't be integrated", "An older desktop application holds key data but offers no way to connect to it."],
      ["Staff copy data between screens", "People move information from one application to another by hand, record by record."],
      ["Routine downloads and uploads eat the day", "Files are fetched, renamed, and uploaded on a schedule that a person has to remember."],
    ],
  },
  {
    label: "Web & SEO",
    href: "/what-we-do/web-seo",
    cards: [
      ["Your website doesn't reflect the business", "The site is outdated, hard to update, or no longer explains what you do today."],
      ["The site is slow", "Pages take too long to load, especially on mobile, and visitors leave before they see anything."],
      ["Customers can't find you in search", "People search for what you offer, but your pages don't appear where they are looking."],
      ["AI search doesn't mention you", "Assistants like ChatGPT and Perplexity answer questions in your field without drawing on your site."],
    ],
  },
];

export default function Solutions() {
  let n = 0;
  const num = () => String(++n).padStart(2, "0");

  return (
    <>
      <PageHero
        eyebrow="Solutions"
        title={
          <>
            Start with the
            <br />
            problem, not the tech.
          </>
        }
        intro="You can bring us a problem before you have a specification. Pick the one that sounds closest — each leads to a starting point."
      />

      {groups.map((group) => (
        <section key={group.href} className="section container problem-group">
          <div className="problem-group-head">
            <p className="eyebrow">{group.label}</p>
            <Link href={group.href} className="problem-group-link">
              See {group.label} <Arrow />
            </Link>
          </div>
          <div className="problem-grid">
            {group.cards.map(([title, body]) => (
              <Link key={title} href={group.href} className="problem-card">
                <span className="eyebrow">{num()}</span>
                <Arrow diagonal />
                <div>
                  <h4>{title}</h4>
                  <p>{body}</p>
                </div>
              </Link>
            ))}
          </div>
        </section>
      ))}

      <section className="section container problem-group">
        <div className="problem-grid">
          <Link href="/start" className="problem-card inverted">
            <span className="eyebrow">{num()}</span>
            <Arrow diagonal />
            <div>
              <h4>None of these fit exactly</h4>
              <p>
                Describe the problem you are facing, even if you do not yet know
                what to build.
              </p>
            </div>
          </Link>
        </div>
      </section>

      <CTABand
        title={
          <>
            Still working out
            <br />
            the requirement?
          </>
        }
        body="Describe what is getting in the way. We will help turn it into a software requirement worth discussing."
      />
    </>
  );
}
