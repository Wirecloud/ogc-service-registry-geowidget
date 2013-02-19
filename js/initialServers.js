/*
 *     Copyright (c) 2013 CoNWeT Lab., Universidad Politécnica de Madrid
 *
 *     This file is part of the GeoWidgets Project,
 *
 *     http://conwet.fi.upm.es/geowidgets
 *
 *     Licensed under the GNU General Public License, Version 3.0 (the 
 *     "License"); you may not use this file except in compliance with the 
 *     License.
 *
 *     Unless required by applicable law or agreed to in writing, software
 *     under the License is distributed in the hope that it will be useful, 
 *     but on an "AS IS" BASIS, WITHOUT ANY WARRANTY OR CONDITION,
 *     either express or implied; without even the implied warranty of
 *     MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.
 *  
 *     See the GNU General Public License for specific language governing
 *     permissions and limitations under the License.
 *
 *     <http://www.gnu.org/licenses/gpl.txt>.
 *
 */

var initialServers = [
    {
        "type"    : "WMS",
        "name"    : "WMS Services",
        "services": [
            {'name': 'IDEE - PNOA', 'url': 'http://www.idee.es/wms/PNOA/PNOA'},
            {'name': 'Catastro', 'url': 'http://ovc.catastro.meh.es/Cartografia/WMS/ServidorWMS.aspx'},
            {'name': 'Atlas Climático Digital de la Península Ibérica', 'url': 'http://www.opengis.uab.es/cgi-bin/iberia/MiraMon5_0.cgi'},
            {'name': 'IDEE - Cuadrículas geográficas', 'url': 'http://www.idee.es/wms/IDEE-Cuadricula-Hojas/IDEE-Cuadricula-Hojas'},
            {'name': 'IDEE - Límites Administrativos', 'url': 'http://www.idee.es/wms/IDEE-Limite/IDEE-Limite'},
            {'name': 'IDEE - Mapa Base' , 'url': 'http://www.idee.es/wms/IDEE-Base/IDEE-Base'},
            {'name': 'Mapa de Ocupación del Suelo', 'url': 'http://www.idee.es/wms/IGN-Corine/IGN-Corine'},
            {'name': 'IDEE - Redes Geodésicas', 'url': 'http://www.idee.es/wms/IDEE-Referencia/IDEE-Referencia'},
            {'name': 'SIGPAC-FEGA (ortofotos)', 'url': 'http://195.235.91.59/wms/wms.aspx'},
            {'name': 'Imágenes Landsat 7 y SPOT', 'url': 'http://www.idee.es/wms/IDEE-Landsat/IDEE-Landsat'},
            {'name': 'IDE Gipuzkoa - Hidrología', 'url': 'http://urhweb.gipuzkoa.net/geowebcache/service/wms'},
            {'name': 'IDE Gipuzkoa - Información territorial', 'url': 'http://b5m.gipuzkoa.net/ogc/wms/gipuzkoa_wms'},
            {'name': 'Junta de Andalucía', 'url': 'http://www.juntadeandalucia.es/servicios/mapas/callejero/wms'}
        ]
    },
    {
        "type"    : "WFS",
        "name"    : "Nomenclátor Services",
        "service_types": ["MNE", "EGN"],
        "services": [
            {'name' : 'Nomenclátor Geográfico Conciso de España', 'url': 'http://www.idee.es/IDEE-WFS-Nomenclator-NGC/services', 'type': 'MNE'},
            {'name' : 'Nomenclátor NOMGEO', 'url': 'http://www.idee.es/IDEE-WFS-Nomenclator-NG/services', 'type': 'MNE'},
            {'name' : 'Información geodésica', 'url': 'http://www.idee.es/IGN-WFS-Geodesia/ogcwebservice', 'type': 'MNE'},
            {'name' : 'Información geodésica ', 'url': 'http://www.idee.es/IGN-WFS-Geodesia/ogcwebservice', 'type': 'MNE'},
            {'name' : 'EGN - Nomenclátor Geográfico Conciso de España', 'url': 'http://www.idee.es/IDEE-WFS-EGN-Nomenclator-NGC/services', 'type': 'EGN'},
            {'name' : 'CartoCiudad Código Postal', 'url': 'http://www.cartociudad.es/wfs-codigo/services', 'type': 'MNE'},
            {'name' : 'CartoCiudad Distrito Censal', 'url': 'http://www.cartociudad.es/wfs-distrito/services', 'type': 'MNE'},
            {'name' : 'CartoCiudad Municipio', 'url': 'http://www.cartociudad.es/wfs-municipio/services', 'type': 'MNE'},
            {'name' : 'CartoCiudad Nomenclator de Portal', 'url': 'http://www.cartociudad.es/wfs-portal/services', 'type': 'MNE'},
            {'name' : 'CartoCiudad Sección Censal', 'url': 'http://www.cartociudad.es/wfs-seccion/services', 'type': 'MNE'},
            {'name' : 'CartoCiudad Nomenclator del Vial', 'url': 'http://www.cartociudad.es/wfs-vial/services', 'type': 'MNE'}
        ]
    },
    {
        "type"    : "RSS",
        "name"    : "GeosRSS Services",
        "services": [
            {'name': 'Reuters: World News', 'url': 'http://ws.geonames.org/rssToGeoRSS?feedUrl=http://feeds.reuters.com/reuters/worldNews'},
            {'name': 'Marca.com', 'url': 'http://ws.geonames.org/rssToGeoRSS?feedUrl=http://marca.feedsportal.com/rss/portada.xml'},
            {'name': 'El Mundo', 'url': 'http://ws.geonames.org/rssToGeoRSS?feedUrl=http://elmundo.feedsportal.com/elmundo/rss/portada.xml'},
            {'name': '20 Minutos', 'url': 'http://ws.geonames.org/rssToGeoRSS?feedUrl=http://20minutos.feedsportal.com/c/32489/f/478284/index.rss'}
        ]
    },
];
