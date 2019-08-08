A type is created with a simple `new Type()` call to the constructor, however to assign properties, the `fromXML` method is used from within _Typal_.

<typedef narrow flatten name="Type">types/Type.xml</typedef>

%~%

_Typal_ is closely integrated with _Documentary_. The development process of upgrading the look and feel of documentation is always in both packages at the same time. However, there is a plan to decouple them and bring all HTML template code into _Documentary_, as well as providing configurable options (e.g., `<boolean>` _underlinePropertyName_, `<boolean>` _joinDefaultWithDescription_, _etc_), skins and the ability to implement custom tables using _JSX_ components.

<typedef narrow flatten name="ToMarkdownOptions">types/Type.xml</typedef>