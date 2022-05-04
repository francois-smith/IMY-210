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
					<fo:region-before background-color="#AEDDF5" extent="10mm"/>
					<fo:region-after background-color="#67B94A" extent="10mm"/>
					<fo:region-start background-color="#AEDDF5" extent="10mm"/>
					<fo:region-end background-color="#67B94A" extent="10mm"/>
					<!-- Complete this declareation by adding the margin, extent and background-color where nessessary -->
				</fo:simple-page-master>
			</fo:layout-master-set>

			<fo:page-sequence master-reference="cover" force-page-count="no-force">
				<fo:flow flow-name="xsl-region-body">
					<fo:block>
						<fo:external-graphic src="url(images/logo.jpg)" content-width="215mm"/>
					</fo:block>
				</fo:flow>
				<!--For the cover page create a single flow and reference the flow to your body region declared in the simple-page-master-->
				<!-- Inside your flow create a block In this block align the content to center, and add the logo image-->
				<!--You can alter the height of the images to how you see fit-->
			</fo:page-sequence>

			<fo:page-sequence master-reference="content" force-page-count="no-force">
				<fo:static-content flow-name="xsl-region-after">
					<fo:block margin-right="10px" margin-top="10px" color="#fff" text-align="right" font-weight="bold">
						<fo:page-number/>
					</fo:block>
				</fo:static-content>

				<fo:static-content flow-name="xsl-region-before">
					<fo:block margin-left="10px" margin-top="10px" color="#fff" font-weight="bold">
						Animal Fact Guide
					</fo:block>
				</fo:static-content>

				<fo:flow flow-name="xsl-region-body">
					<xsl:for-each select="animals/animal">
						<fo:block-container height="60mm" width="190mm" page-break-before="always">
							<fo:block end-indent="0mm" start-indent="0mm">
								<xsl:variable name="imagePath" select="concat('url(images/', @image, ')')"/>
								<fo:block-container position="absolute" start-indent="10mm" top="10mm">
									<fo:block>
										<fo:external-graphic background-color="#000" content-height="55mm" padding="0.8mm" border-style="solid" border-width="0.3mm" border-color="#777">
											<xsl:attribute name="src">
												<xsl:value-of select="$imagePath"/>
											</xsl:attribute>
										</fo:external-graphic>
									</fo:block>
								</fo:block-container>
								<fo:block-container margin-left="30mm" start-indent="10mm" margin-top="10mm">
									<fo:block font-weight="bold">
										<xsl:value-of select="name"/>
									</fo:block>
									<fo:block font-weight="bold" color="#137DAB">
										<xsl:value-of select="sciName"/>
									</fo:block>
									<fo:block padding="2.5mm" background-color="#AEDDF5">
										<fo:block>
											<xsl:value-of select="abstract"/>
										</fo:block>
										<fo:block font-size="3.5mm">
											Read more at
											<xsl:value-of select="abstract/@more"/>
										</fo:block>
									</fo:block>
									<fo:block margin-top="6mm">
										<fo:inline font-weight="bold">Tags:   </fo:inline>
										<fo:inline margin-right="2mm">
											<xsl:for-each select="tags/tag">
												<xsl:value-of select="."/>
												<xsl:if test="position() != last()">
												/ 
												</xsl:if>
											</xsl:for-each>
										</fo:inline>
									</fo:block>
								</fo:block-container>
							</fo:block>
						</fo:block-container>
					</xsl:for-each>
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
