(:Francois Smith - u21649988:)
<HTML>
  {
    <TOTAL>{
       for $doc in doc("cd.xml")/CATALOG
       return count($doc/CD)
  }</TOTAL>
  }
  {
    <ABOVE>{
           <COUNT>{
               for $doc in doc("cd.xml")/CATALOG
               return count($doc/CD[PRICE > 9])
           }</COUNT>
         }
         {
           for $doc in doc("cd.xml")/CATALOG/CD
           where $doc/PRICE > 9
           order by $doc/COUNTRY, $doc/TITLE
           return <TITLE>{data($doc/TITLE)}</TITLE>
     }</ABOVE>
  }
  {
    <BELOW>{
           <COUNT>{
               for $doc in doc("cd.xml")/CATALOG
               return count($doc/CD[PRICE < 9])
           }</COUNT>
         }
         {
           for $doc in doc("cd.xml")/CATALOG/CD
           where $doc/PRICE < 9
           order by $doc/COUNTRY, $doc/TITLE
           return <TITLE>{data($doc/TITLE)}</TITLE>
     }</BELOW>
  }
</HTML>