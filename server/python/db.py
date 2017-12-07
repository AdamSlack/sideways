import psycopg2 as pg

def connect_to_db(host, dbname, user, password):
    """ Connect to Database returning pyscopg2 cursor object """
    try:
        conn_string = "host='" + host + "' dbname='" + dbname + "' user='" + user + "' password='" + password +"'"
        
        print('Connecting to DB: ' + conn_string)
        db = pg.connect(conn_string)

        print('Connected to DB.')
        return db
    except:
        print('Unable to connect to DB')


def create_participant(db, p_id):
    """ Insert an entity-term for a book into the DB. """
    cursor = db.cursor()
    try:
        cursor.execute("""
            insert into participants (participant_id)
                values (select max(participant_id) from participants))
        """)
    except:
        db.rollback()
        return False

    cursor.close()
    db.commit()
    return cursor.selectone()[0]

def participant_exists(db, p_id):
    """ check if participant ID is in the database. """
    cursor = db.cursor()
    cursor.execute("""select count(*) from participants where participant_id = %s""", (p_id,))
    res = cursor.fetchone()
    print(res)
    if res[0] > 0:
        return True
    else:
        return False

def select_localisation_presets(db):
    """ Create a cursor pointing to all book titles"""
    cursor = db.cursor()
    cursor.execute("""select region from localisation_presets""")
    return cursor