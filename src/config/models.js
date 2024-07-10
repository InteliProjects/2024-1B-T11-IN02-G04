/**
 * Default model configuration
 * (sails.config.models)
 *
 * Unless you override these settings in a model definition, these properties
 * will be included as defaults for all of your models.
 */

module.exports.models = {

  /***************************************************************************
  *                                                                          *
  * Your app's default datastore.                                            *
  *                                                                          *
  * (default: localDiskDb)                                                   *
  *                                                                          *
  ***************************************************************************/

  datastore: 'default',

  /***************************************************************************
  *                                                                          *
  * By default, the "migrate" setting is set to "alter". This means that     *
  * Sails will attempt to automatically rebuild the tables/collections/etc.  *
  * in your database to match your models.                                   *
  *                                                                          *
  * To disable this, change "alter" to "safe".                               *
  *                                                                          *
  ***************************************************************************/

  migrate: 'alter',

  /***************************************************************************
  *                                                                          *
  * Base attributes that are included in all of your models by default.      *
  *                                                                          *
  * (These may be overridden in individual model definitions.)               *
  *                                                                          *
  ***************************************************************************/

  attributes: {
    // In addition to a primary key (`id`), Sails will include default
    // properties for `createdAt` and `updatedAt`. Unless you override
    // these in a model definition, they will be injected into your
    // models automatically.
    createdAt: { type: 'number', autoCreatedAt: true, },
    updatedAt: { type: 'number', autoUpdatedAt: true, },
    id: { type: 'number', autoIncrement: true, },

    // Additional attributes
    name: { type: 'string' },
  },

  /***************************************************************************
  *                                                                          *
  * Whether the `.create()` and `.update()` model methods should ignore      *
  * and refuse to persist unrecognized data-- i.e. properties other than     *
  * those explicitly defined by attributes in the model definition.          *
  *                                                                          *
  * (By default, this is set to `true` in core apps built with the Sails     *
  * framework, to help keep track of sensitive information and sidestep      *
  * common pitfalls.)                                                        *
  *                                                                          *
  * However, if you use this flag, be aware that unrecognized data will be   *
  * silently ignored, which could be confusing.                              *
  *                                                                          *
  ***************************************************a************************/

  schema: true,

};
