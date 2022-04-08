<?xml version="1.0"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
    <xsl:output method="html"/>
    <xsl:template match="/">
        <html>
            <body>
                <b>Available Books</b><br/>
                <xsl:for-each select="up/library/book">
                    <xsl:apply-templates select="up/library/book"/>
                </xsl:for-each>
            </body>
        </html>
    </xsl:template>

    <xsl:template match="book[not(@status='out')]">
        <span>
            Book <xsl:value-of select="@isbn"/> can be found in Merensky

            <xsl:variable name="currentBook" select="@isbn"/>
            <xsl:for-each select="/up/library[position()>1]/book[not(@status='out') and @isbn = $currentBook]">
            <span>, <xsl:value-of select="../@name"/></span>
            </xsl:for-each>            
        </span><br/>
    </xsl:template>
</xsl:stylesheet>
