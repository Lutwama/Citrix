import SiteLayout from "./(site)/layout";
import SiteNotFound from "./(site)/not-found";

// Unmatched URLs render here (outside the (site) group), so wrap the branded
// 404 in the normal header/footer.
export default function NotFound() {
  return (
    <SiteLayout>
      <SiteNotFound />
    </SiteLayout>
  );
}
