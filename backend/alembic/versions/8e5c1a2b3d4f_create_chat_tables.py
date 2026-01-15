"""create conversation and message tables"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '8e5c1a2b3d4f'
down_revision = '67589f659adb'
branch_labels = None
depends_on = None


def upgrade():
    op.create_table(
        'conversations',
        sa.Column('id', sa.Integer(), nullable=False),
        sa.Column('user_id', sa.Integer(), nullable=False), # User_id should not be nullable
        sa.Column('created_at', sa.DateTime(), nullable=False),
        sa.Column('updated_at', sa.DateTime(), nullable=False),
        sa.PrimaryKeyConstraint('id')
    )
    op.create_index(op.f('ix_conversations_id'), 'conversations', ['id'], unique=False)
    op.create_index(op.f('ix_conversations_user_id'), 'conversations', ['user_id'], unique=False)

    op.create_table(
        'messages',
        sa.Column('id', sa.Integer(), nullable=False),
        sa.Column('conversation_id', sa.Integer(), nullable=False),
        sa.Column('user_id', sa.Integer(), nullable=False),
        sa.Column('role', sa.String(), nullable=False),
        sa.Column('content', sa.String(), nullable=False),
        sa.Column('created_at', sa.DateTime(), nullable=False),
        sa.PrimaryKeyConstraint('id')
    )
    op.create_index(op.f('ix_messages_id'), 'messages', ['id'], unique=False)
    op.create_foreign_key(
        'fk_messages_conversation_id_conversations', # Explicit name for foreign key
        'messages', 'conversations',
        ['conversation_id'], ['id']
    )
    op.create_foreign_key(
        'fk_conversations_user_id_users', # Explicit name for foreign key
        'conversations', 'users',
        ['user_id'], ['id']
    )


def downgrade():
    op.drop_constraint('fk_messages_conversation_id_conversations', 'messages', type_='foreignkey')
    op.drop_constraint('fk_conversations_user_id_users', 'conversations', type_='foreignkey')
    op.drop_index(op.f('ix_messages_id'), table_name='messages')
    op.drop_table('messages')
    op.drop_index(op.f('ix_conversations_user_id'), table_name='conversations')
    op.drop_index(op.f('ix_conversations_id'), table_name='conversations')
    op.drop_table('conversations')