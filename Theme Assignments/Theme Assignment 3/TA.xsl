<?xml version="1.0"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
    <xsl:output method="html"/>
    <xsl:template match="/">
        <html>
            <body>
                <b>Available Books</b><br/>
                <xsl:apply-templates select="up/library[@name='merensky']/book">
                    <xsl:sort select="@isbn" order="ascending" data-type="number"/>
                </xsl:apply-templates>
                <br/>
                <xsl:variable name="availBooks" select="up/library/book[not(@status='out')]"/>
                <i>Total books available: <xsl:value-of select="count($availBooks)"/></i><br/>
                <xsl:variable name="outBooks" select="up/library/book[@status='out']"/>
                <i>Total books taken out: <xsl:value-of select="count($outBooks)"/></i>
            </body>
        </html>
    </xsl:template>

    <xsl:template match="book[not(@status='out')]">
        <span>
            Book <xsl:value-of select="@isbn"/> can be found in Merensky
            <xsl:variable name="currentBook" select="@isbn"/>
            <xsl:for-each select="/up/library[position()>1]/book[not(@status='out') and @isbn = $currentBook]">
                <xsl:if test="../@name='klinikala'"><span>, Klinikala</span></xsl:if>
                <xsl:if test="../@name='music'"><span>, Music</span></xsl:if>
            </xsl:for-each>            
        </span><br/>
    </xsl:template>
</xsl:stylesheet>
