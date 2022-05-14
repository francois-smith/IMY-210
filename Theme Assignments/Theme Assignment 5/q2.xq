(:Francois Smith - u21649988:)
<list>
  {
    for $doc in doc("cd.xml")/CATALOG/CD
    where $doc/YEAR < 1987
    return <li>{data($doc/TITLE)} by {data($doc/ARTIST)} - {data($doc/COMPANY)}, {data($doc/COUNTRY)}</li>
  }
</list>