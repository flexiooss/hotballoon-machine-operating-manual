StoreNavbar:
  selected: int
  linkCollection:
    $list:
      $value-object: io.flexio.component_doc.stores.SchemaLink

SchemaLink:
  url:
    $value-object: io.flexio.component_router.types.URLExtended
  name: String