<?xml version="1.0"?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform" xmlns:fo="http://www.w3.org/1999/XSL/Format" version="1.0">
	
	<xsl:output method="xml" indent="yes" />
	
	<xsl:template match="/">
		<fo:root>
			<fo:layout-master-set>
				<fo:simple-page-master master-name="cover" page-height="80mm" page-width="210mm">
					<fo:region-body/>
				</fo:simple-page-master>

				<fo:simple-page-master master-name="content" page-height="80mm" page-width="210mm">
					<fo:region-body/>
					<fo:region-before/>
					<fo:region-after/>
					<fo:region-start/>
					<fo:region-end/>
					<!-- Complete this declareation by adding the margin, extent and background-color where nessessary -->
				</fo:simple-page-master>
			</fo:layout-master-set>

			<fo:page-sequence master-reference="cover">
				<fo:flow flow-name="xsl-region-body">
					<fo:block/>
				</fo:flow>
				<!--For the cover page create a single flow and reference the flow to your body region declared in the simple-page-master-->
				<!-- Inside your flow create a block In this block align the content to center, and add the logo image-->
				<!--You can alter the height of the images to how you see fit-->
			</fo:page-sequence>

			<fo:page-sequence master-reference="content">
				<fo:flow flow-name="xsl-region-body">
					<fo:block/>
				</fo:flow>
				<!--
				For the content page create: 
				two static-content - for the repeated header and footer for each page, reference the static-content to your before and after region 
				a flow - for the main content, reference the flow to your body region
				-->

				<!--
				Static-content header
					add a block/margin on the left side of the text
					add a block of text that prints the output as in the result
				-->
				<!--
				Static-content footer
					add a block/margin on the left side of the text
					add a block of text that prints the page number
				-->
				
				<!--
				Flow
					Create a for each loop to loop through all animals 
					Display all the information about the animal in a similar fashion as on the example
					Add a border around the image
					Remember to separate each tag with a / symbol 
				-->
			</fo:page-sequence>
		</fo:root>
	</xsl:template>
</xsl:stylesheet>
