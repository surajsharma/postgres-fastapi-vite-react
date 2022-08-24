'''seed data'''


# import sqlalchemy as sa
# from db import engine

INITIAL_DATA = {
    'items':[
            {'type': 'bank-draft', 'title': 'Bank Draft', 'position': '0'},
            {'type': 'bill-of-lading', 'title': 'Bill of Lading', 'position': '1'},
            {'type': 'invoice', 'title': 'Invoice', 'position': '2'},
            {'type': 'bank-draft-2', 'title': 'Bank Draft 2', 'position': '3'},
            {'type': 'bill-of-lading-2', 'title': 'Bill of Lading 2', 'position': '4'}
        ]
    }

# def initialize_table(target, connection, **kw):
#     """This method receives a table, a connection and inserts data to that table."""

#     tablename = str(target)
#     metadata = sa.MetaData()
#     table=sa.Table(tablename, metadata, autoload=True, autoload_with=engine)

#     if tablename in INITIAL_DATA and len(INITIAL_DATA) > 0:
#         try:
#             connection.load_table(tablename)
#             connection.execute(table.insert(), INITIAL_DATA)
#         except NoSuchTableError as tabel_error:
#             print("Table {} does not exist. It will be created now".format(tabel_error))
#             connection.get_table(tablename, primary_id="position", primary_type="Integer")
#             print("Created table {} on database {}".format(tablename, DB_name))
            
    # print('INIT TABLE')
