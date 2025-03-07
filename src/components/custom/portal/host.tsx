import { PORTAL_HOSTS } from "@/lib/constants";

function PortalHost({
  portalHostId,
}: {
  portalHostId: (typeof PORTAL_HOSTS)[keyof typeof PORTAL_HOSTS];
}) {
  return <div id={portalHostId.toString()} />;
}

export default PortalHost;
