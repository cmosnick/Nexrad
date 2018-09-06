define([
    'dojo/_base/declare',
    'dijit/_WidgetBase',
    'dijit/_TemplatedMixin',
    'dijit/_WidgetsInTemplateMixin',
    'esri/layers/WebTiledLayer',
    'dojo/_base/lang',
    'dojo/text!./Nexrad/templates/Nexrad.html',
    'dojox/timing',
    'dijit/form/Button',
    'dojo/domReady!'


], function (declare, _WidgetBase, _TemplatedMixin, _WidgetsInTemplateMixin,
 WebTiledLayer, lang, template, timing) {

    return declare([_WidgetBase, _TemplatedMixin, _WidgetsInTemplateMixin], {

        idgetsInTemplate: true,
        templateString: template,
        layers: [],

        postCreate: function () {
            this.inherited(arguments);
            this._init();
            this.m = 0;
            this.t = new timing.Timer(1000);
            this.t.onTick = lang.hitch(this, '_ticker', this.m);
        },

        _startTicker: function () {
            this.t.start();
        },

        _stopTicker: function () {
            this.t.stop();
            this._hideAllLayers();
        },


        _ticker: function (n) {
            this.m += 1;
            n = this.m % 11;
            if (n === 0) {
                this.nexrad5m.hide();
                this.nexrad.hide();
                this.nexrad50m.show();
            } else if (n === 1) {
                this.nexrad45m.show();
            } else if (n === 2) {
                this.nexrad50m.hide();
                this.nexrad40m.show();
            } else if (n === 3) {
                this.nexrad45m.hide();
                this.nexrad35m.show();
            } else if (n === 4) {
                this.nexrad40m.hide();
                this.nexrad30m.show();
            } else if (n === 5) {
                this.nexrad35m.hide();
                this.nexrad25m.show();
            } else if (n === 6) {
                this.nexrad30m.hide();
                this.nexrad20m.show();
            } else if (n === 7) {
                this.nexrad25m.hide();
                this.nexrad15m.show();
            } else if (n === 8) {
                this.nexrad20m.hide();
                this.nexrad10m.show();
            } else if (n === 9) {
                this.nexrad15m.hide();
                this.nexrad5m.show();
            } else if (n === 10) {
                this.nexrad10m.hide();
                this.nexrad.show();
            }
        },

        _init: function () {
            var subs = ['mesonet', 'mesonet1', 'mesonet2', 'mesonet3'];
            this.nexrad50m = new WebTiledLayer('http://${subDomain}.agron.iastate.edu/cache/tile.py/1.0.0/nexrad-n0q-900913-m50m/${level}/${col}/${row}.png', {
                id: 'nexrad50',
                subDomains: subs
            });
            this.nexrad45m = new WebTiledLayer('http://${subDomain}.agron.iastate.edu/cache/tile.py/1.0.0/nexrad-n0q-900913-m45m/${level}/${col}/${row}.png', {
                id: 'nexrad45',
                subDomains: subs
            });
            this.nexrad40m = new WebTiledLayer('http://${subDomain}.agron.iastate.edu/cache/tile.py/1.0.0/nexrad-n0q-900913-m40m/${level}/${col}/${row}.png', {
                id: 'nexrad40',
                subDomains: subs
            });
            this.nexrad35m = new WebTiledLayer('http://${subDomain}.agron.iastate.edu/cache/tile.py/1.0.0/nexrad-n0q-900913-m35m/${level}/${col}/${row}.png', {
                id: 'nexrad35',
                subDomains: subs
            });
            this.nexrad30m = new WebTiledLayer('http://${subDomain}.agron.iastate.edu/cache/tile.py/1.0.0/nexrad-n0q-900913-m30m/${level}/${col}/${row}.png', {
                id: 'nexrad30',
                subDomains: subs
            });
            this.nexrad25m = new WebTiledLayer('http://${subDomain}.agron.iastate.edu/cache/tile.py/1.0.0/nexrad-n0q-900913-m25m/${level}/${col}/${row}.png', {
                id: 'nexrad25',
                subDomains: subs
            });
            this.nexrad20m = new WebTiledLayer('http://${subDomain}.agron.iastate.edu/cache/tile.py/1.0.0/nexrad-n0q-900913-m20m/${level}/${col}/${row}.png', {
                id: 'nexrad20',
                subDomains: subs
            });
            this.nexrad15m = new WebTiledLayer('http://${subDomain}.agron.iastate.edu/cache/tile.py/1.0.0/nexrad-n0q-900913-m15m/${level}/${col}/${row}.png', {
                id: 'nexrad15',
                subDomains: subs
            });
            this.nexrad10m = new WebTiledLayer('http://${subDomain}.agron.iastate.edu/cache/tile.py/1.0.0/nexrad-n0q-900913-m10m/${level}/${col}/${row}.png', {
                id: 'nexrad10',
                subDomains: subs
            });
            this.nexrad5m = new WebTiledLayer('http://${subDomain}.agron.iastate.edu/cache/tile.py/1.0.0/nexrad-n0q-900913-m05m/${level}/${col}/${row}.png', {
                id: 'nexrad5',
                subDomains: subs
            });
            this.nexrad = new WebTiledLayer('http://${subDomain}.agron.iastate.edu/cache/tile.py/1.0.0/nexrad-n0q-900913/${level}/${col}/${row}.png', {
                id: 'nexrad',
                subDomains: subs
            });

            this.layers.push(this.nexrad50m);
            this.layers.push(this.nexrad45m);
            this.layers.push(this.nexrad40m);
            this.layers.push(this.nexrad35m);
            this.layers.push(this.nexrad30m);
            this.layers.push(this.nexrad25m);
            this.layers.push(this.nexrad20m);
            this.layers.push(this.nexrad15m);
            this.layers.push(this.nexrad10m);
            this.layers.push(this.nexrad5m);
            this.layers.push(this.nexrad);

            // Hide all layers
            this._hideAllLayers();

            // Add all layers to map
            this.layers.forEach(function (layer) {
                this.map.addLayer(layer);
            }, this);
        },

        _hideAllLayers: function () {
            this.layers.forEach(function (layer) {
                layer.hide();
            });
        }
    });
});
