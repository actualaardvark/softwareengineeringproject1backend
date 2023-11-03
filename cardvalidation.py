# Marshmallow for API Validation
from marshmallow import Schema, fields, ValidationError

class CardSchema(Schema):
    difficulty = fields.Integer(required=True)
    description = fields.String(required=True)
    title = fields.String(required=True)
class EditCardSchema(Schema):
    id = fields.String(required=True)
    difficulty = fields.Integer(required=True)
    description = fields.String(required=True)
    title = fields.String(required=True)
class RemoveCardSchema(Schema):
    id = fields.String(required=True)