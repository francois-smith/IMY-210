<?xml version="1.0"?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform" version="1.0">
	<xsl:output method="html" indent="yes" />

	<xsl:template match="/">
        <html>
            <head>
                <link rel="stylesheet" href="style.css"/>
            </head>
            <body>
                <header>
                    <a>
                        <xsl:attribute name="href">
                            <xsl:value-of select="character/@source"/>
                        </xsl:attribute>
                        <img src="./images/diablo3-logo.png"/>
                    </a>
    
                    <xsl:variable name="lowercase" select="'abcdefghijklmnopqrstuvwxyz'"/>
                    <xsl:variable name="uppercase" select="'ABCDEFGHIJKLMNOPQRSTUVWXYZ'"/>
                    <h1><xsl:value-of select="translate(character/class/basic/name, $lowercase, $uppercase)"/></h1>
    
                    <span id="last-updated">Last updated on: <xsl:value-of select="character/class/basic/update"/> by <xsl:value-of select="character/class/basic/creator"/></span>
    
                    <div id="tags-div">
                        <span id="tags-header">Tags</span><br/>
                        <div>
                            <xsl:for-each select="character/class/basic/tags/tag[not(@status='outdated')]">
                                <span class="tag">
                                    <xsl:value-of select="."/>
                                    <xsl:if test="position() != last()">
                                        <span>, </span>
                                    </xsl:if>
                                </span>
                            </xsl:for-each> 
                        </div>
                    </div>
    
                    <xsl:variable name="maxLevel">
                        <xsl:for-each select="//level">
                            <xsl:sort select="." data-type="number" order="descending"/>
                            <xsl:if test="position() = 1"><xsl:value-of select="."/></xsl:if>
                        </xsl:for-each>
                    </xsl:variable>
                    <xsl:variable name="avgLevel">
                        <xsl:value-of select="ceiling(sum(character/class/items/item/requirements/level) div count(character/class/items/item/requirements/level))"/>
                    </xsl:variable>
                    <b><span id="required-level-header">Level required for build: <xsl:value-of select="$maxLevel"/> Average item level: <xsl:value-of select="$avgLevel"/></span></b>
                </header>
                <main>
                    <section>
                        <h2><span class="section-title">Paragon Priorities</span></h2>
                        <div id="paragon-table">
                            <table>
                                <tr>
                                    <xsl:for-each select="character/class/paragon">
                                        <th><xsl:value-of select="@set"/></th>
                                    </xsl:for-each>
                                </tr>
                                <tr>
                                    <xsl:for-each select="character/class/paragon">
                                        <td>
                                            <ol>
                                                <xsl:for-each select="priority">
                                                    <xsl:sort select="@weight" data-type="number" order="ascending"/> 
                                                    <li><xsl:value-of select="."/></li>
                                                </xsl:for-each>
                                            </ol>
                                        </td>
                                    </xsl:for-each>
                                </tr>
                            </table>
                        </div>
                    </section>
                    <section>
                        <h2><span class="section-title">Skills</span></h2>
                        <xsl:variable name="skills" select="character/class/skills/skill[@type='active']"/>
                        <xsl:variable name="count" select="count($skills)"/>

                        <div id="skills-section">
                            <h3 class="skills-heading">Active</h3>
                            <table id="active-table">
                                <tr>
                                    <xsl:apply-templates select="$skills[position() mod 2 = 1]">
                                        <xsl:sort select="$skills/name"/>
                                    </xsl:apply-templates>
                                </tr>
                                <tr>
                                    <xsl:apply-templates select="$skills[position() mod 2 = 0]">
                                        <xsl:sort select="$skills/name"/>
                                    </xsl:apply-templates>
                                </tr>
                            </table>
    
                            <h3 class="skills-heading">Passive</h3>
                            <table id="passive-table">
                                <tr>
                                    <xsl:apply-templates select="character/class/skills/skill[@type='passive']">
                                        <xsl:sort select="requirements/level" data-type="number" order="descending"/>
                                    </xsl:apply-templates>
                                </tr>
                            </table>
                        </div>
                    </section>
                    <section>
                        <h2><span class="section-title">Gear</span></h2>
                        <div id="gear-section">
                            <xsl:apply-templates select="character/class/items/item">
                                <xsl:sort select="set"/>
                            </xsl:apply-templates>
                        </div>
                    </section>
                    <section>
                        <h2><span class="section-title">Kanai’s Cube</span></h2>
                        <div id="kunai-section">
                            <xsl:apply-templates select="character/class/cubes/item">
                                <xsl:sort select="name"/>
                            </xsl:apply-templates>
                        </div>       
                    </section>
                </main>
                <footer>
                    <span>Created By Francois Smith(u21649988) on 11 May 2022</span>
                </footer>
            </body>
        </html>
	</xsl:template>

    <xsl:template match="skill">
        <td>
            <img class="skill-image">
                <xsl:attribute name="src">
                    <xsl:value-of select="concat('images/skills/', @image)"/>
                </xsl:attribute>
            </img><br/>
            <b><span><xsl:value-of select="name"/></span></b><br/>
            <xsl:if test="@type = 'active'">
                <span><xsl:value-of select="cost"/> - <xsl:value-of select="cost/@unit"/></span>
            </xsl:if>
            <p><xsl:value-of select="description"/></p>
            <xsl:if test="@type = 'active'">
                <img>
                    <xsl:attribute name="src">
                        <xsl:value-of select="concat('images/skills/', rune/@image)"/>
                    </xsl:attribute>
                </img><br/>
                <i><span><xsl:value-of select="rune/name"/></span></i><br/>
                <p><xsl:value-of select="rune/description"/></p>
            </xsl:if>
        </td>
    </xsl:template>

    <xsl:template match="item">
        <div style="border: {rarity} 1px solid; border-radius: 10px;" class="gear-item">
            <h3><span style="color: {rarity};"><xsl:value-of select="name"/> (<xsl:value-of select="set/@type"/>)</span></h3>
            <h4 style="color: {rarity};"><xsl:value-of select="rarity/@set"/>&#160;<xsl:value-of select="set"/></h4>
            <div class="item-image" style="background-color: {rarity};">
                <img>
                    <xsl:attribute name="src">
                        <xsl:value-of select="concat('images/gear/', @image)"/>
                    </xsl:attribute>
                </img><br/>
            </div>
            <div class="level-req">
                <span>Level requirement: <xsl:value-of select="requirements/level"/></span>
            </div>
            <xsl:if test="stats/defense">
                <div style="border: {rarity} 1px solid;" class="item-stats">
                    <span><b>Armor</b>&#160;<xsl:value-of select="stats/defense/armor"/></span>
                </div>
            </xsl:if>
            <xsl:if test="stats/attack">
                <div style="border: {rarity} 1px solid;" class="item-stats">
                    <span><b>DPS</b>&#160;<xsl:value-of select="stats/attack/dps"/>&#160;<b>DMG</b>&#160;<xsl:value-of select="stats/attack/damage"/>&#160;<b>APS</b>&#160;<xsl:value-of select="stats/attack/aps"/></span>
                </div>
            </xsl:if><br/>
            <xsl:if test="stats/primary">
                <div class="stat-section-title">
                    <span>Primary Stats</span><br/>
                </div>
                <ul>
                    <xsl:for-each select="stats/primary/stat">
                        <li><xsl:value-of select="."/></li>
                    </xsl:for-each>
                </ul>
            </xsl:if>
            <xsl:if test="stats/secondary">
                <div class="stat-section-title">
                    <span>Secondary Stats</span><br/>
                </div>
                <ul>
                    <xsl:for-each select="stats/secondary/stat">
                        <li><xsl:value-of select="."/></li>
                    </xsl:for-each>
                </ul>
            </xsl:if>
        </div>
    </xsl:template>
</xsl:stylesheet>
