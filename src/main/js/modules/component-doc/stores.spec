SchemaLink:
  url: string
  name: String


StoreNavbar:
  selected: int
  linkCollection:
    $list:
      $value-object: org.generated.io.flexio.component-doc.SchemaLink
