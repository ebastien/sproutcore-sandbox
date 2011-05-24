// ==========================================================================
// Project:   MyCharts
// Copyright: @2011 My Company, Inc.
// ==========================================================================
/*globals MyCharts */

/** @namespace

  My cool new framework.  Describe your framework.
  
  @extends SC.Object
*/
MyCharts = SC.Object.create(
  /** @scope MyCharts.prototype */ {

  NAMESPACE: 'MyCharts',
  VERSION: '0.1.0',

  // TODO: Add global constants or singleton objects needed by your app here.

}) ;

MyCharts.ChartView = SC.View.extend({
  title: null,
  xAxis: null,
  yAxis: null,
  series: null,

  chart: null,

  _defaults: {
    chart: { defaultSeriesType: 'bar' },
    title: { text: 'Fruit Consumption' },
    xAxis: { categories: ['Apples', 'Bananas', 'Oranges'] },
    yAxis: { title: { text: 'Fruit eaten' } },
    series: [{
      name: 'Jane',
      data: [1, 0, 4]
    }, {
      name: 'John',
      data: [5, 7, 3]
    }]
  },

  didAppendToDocument: function() {
    var options = SC.copy(this._defaults);
    options.chart.renderTo = this.get('layerId');
    var chart = new Highcharts.Chart(options);
    this.set('chart', chart);
  },
  
  _didTitleChange: function() {
    if (this.chart) {
      this.chart.setTitle({ text: this.get('title') });
    }
  }.observes('title'),
  
  _didXAxisChange: function() {
    if (this.chart) {
      this.chart.xAxis = this.get('xAxis');
    }
  }.observes('xAxis'),
  
  _didYAxisChange: function() {
    if (this.chart) {
      this.chart.yAxis = this.get('yAxis');
    }
  }.observes('yAxis'),
  
  _didSeriesChange: function() {
    if (this.chart) {
      this.chart.series = this.get('series');
    }
  }.observes('series')
});
