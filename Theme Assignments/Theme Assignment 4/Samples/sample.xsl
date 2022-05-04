<?xml version="1.0"?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform" xmlns:fo="http://www.w3.org/1999/XSL/Format" version="1.0">
	<!-- fop -xml sample.xml -xsl sample.xsl -pdf result.pdf -->
	<xsl:output method="xml" indent="yes" />
	
	<xsl:template match="/">
		<fo:root>
			<fo:layout-master-set>
				<fo:simple-page-master master-name="content" page-height="100mm" page-width="50mm">
					<fo:region-body margin="5mm"/>
					<fo:region-before/>
					<fo:region-after extent="10mm" background-color="#123123"/>
					<fo:region-start/>
					<fo:region-end/>
				</fo:simple-page-master>
			</fo:layout-master-set>

			<fo:page-sequence master-reference="content">
				<fo:static-content  flow-name="xsl-region-after">
					<fo:block color="#999999">
						<fo:page-number/>
					</fo:block>
				</fo:static-content>

				<fo:flow flow-name="xsl-region-body">
					<fo:block font-weight="bold">
						<xsl:value-of select="root"/>
					</fo:block>
				</fo:flow>
			</fo:page-sequence>
		</fo:root>
	</xsl:template>
</xsl:stylesheet>
