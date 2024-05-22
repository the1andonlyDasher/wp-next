import ContactForm from "@/components/ContactForm";
import { FunctionComponent } from "react";

interface ContactProps {

}

const Contact: FunctionComponent<ContactProps> = () => {
    return (<>
        <ContactForm props={{
            title: "Contact",
            subtitle: "Because smoke signals are outdated",
            sectionName: "contact",
            id: "contact"
        }} />
    </>);
}

export default Contact;