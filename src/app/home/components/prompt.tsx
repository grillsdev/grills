import { TypingAnimation } from "@/components/magicui/typing-animation";

const Prompt = () => {
  return (
    <TypingAnimation duration={33} className="text-base md:text-lg md:leading-7" >
      Create a user interface with a two-column layout. The layout
      should consist of a fixed-width left sidebar for navigation and a main
      content area on the right. The main content should dynamically update
      based on the item selected in the sidebar. Sidebar Navigation Structure
      The sidebar should be a vertical navigation pane with the following
      components: Top Section: A `Back to app` link with a back arrow icon. Main
      Navigation: A series of distinct sections, with bold text headings to
      organize menu items. These sections are: Preferences: Profile,
      Notifications, Security & access, and Connected accounts. Issues: Labels,
      Templates, and SLAs. Projects: Labels, Templates, Statuses, and Updates.
      Features: Initiatives, Documents, Customer requests, Pulse, Asks, Emojis,
      and Integrations. Menu Item Details: Each menu item must have a unique
      icon to its left and a text label. The active item should be visually
      distinct. Bottom Section: A smaller, separate link for `Administration`
      with a question mark icon. Main Content Area Structure The main content
      area should change based on the selected sidebar item. General View
      Structure Most content views should follow this structure: Prominent
      Title: A large title at the top that corresponds to the selected sidebar
      item (e.g., `Preferences` or `Profile`). Logical Sections: The content
      should be divided into sections, each with a clear subheading (e.g.,
      `General`, `Interface and theme`, `Desktop application`). Settings List:
      Within each section, display a list of settings or information. Each
      setting row should have: Left Side: A main label (e.g., `Default home
      view`) with a smaller, secondary text description below it. Right Side: A
      control element for the setting. Control Elements The control elements
      should be appropriate for the setting type: Toggle Switches: For binary
      options (e.g., `Display full names`). Dropdown Menus: For selecting from a
      predefined list (e.g., `First day of the week`). Text Input Fields: For
      entering editable information (e.g., Full name, Username). Display-only
      Text Fields: For non-editable information (e.g., Email). Specialized View:
      `Issue labels` The `Issue labels` view should have a unique layout: Top
      Header: A header with a search bar and two buttons (`New group` and `New
      label`). Content Display: Below the header, display a list of items in a
      table-like structure. The columns should be: Name, Usage, Last applied,
      and Created.
    </TypingAnimation>
  );
};

export default Prompt;
