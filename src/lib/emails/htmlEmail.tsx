import { render } from "@react-email/render";
import { MagicLinkEmail } from "./MagicLinkEmail";

export const emailHtml = ({url, host}:{url: string, host: string}) => render(<MagicLinkEmail url={url} host={host} />)