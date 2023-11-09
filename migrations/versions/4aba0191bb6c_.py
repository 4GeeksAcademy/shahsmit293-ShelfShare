"""empty message

Revision ID: 4aba0191bb6c
Revises: 346e5bf69b60
Create Date: 2023-11-01 17:46:07.784407

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '4aba0191bb6c'
down_revision = '346e5bf69b60'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('book', schema=None) as batch_op:
        batch_op.add_column(sa.Column('image', sa.String(length=2000), nullable=True))

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('book', schema=None) as batch_op:
        batch_op.drop_column('image')

    # ### end Alembic commands ###
