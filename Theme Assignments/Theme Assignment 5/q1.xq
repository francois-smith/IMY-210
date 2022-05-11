(:Francois Smith - u21649988:)
round(sum(
  for $doc in doc("cd.xml")/CATALOG/CD
  let $total := $doc/PRICE
return $total))